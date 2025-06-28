use candid::{CandidType, Principal};
use ic_cdk_macros::{query, update};
use serde::{Deserialize, Serialize};
use std::cell::RefCell;
use std::collections::HashMap;

#[derive(Clone, CandidType, Deserialize, Serialize)]
struct LandMetadata {
    name: String,
    coordinates: String,
    size: String,
    media_hash: String,
}

#[derive(Clone, CandidType, Deserialize, Serialize)]
struct Listing {
    id: u64,
    price: u64,
}

thread_local! {
    static LANDS: RefCell<Vec<LandMetadata>> = RefCell::new(Vec::new());
    static OWNERS: RefCell<Vec<Principal>> = RefCell::new(Vec::new());
    static LAND_LISTINGS: RefCell<HashMap<u64, u64>> = RefCell::new(HashMap::new());
}

#[update]
fn mint(metadata: LandMetadata) -> u64 {
    let id = LANDS.with(|lands| {
        let mut lands = lands.borrow_mut();
        lands.push(metadata);
        (lands.len() - 1) as u64
    });

    OWNERS.with(|owners| {
        owners.borrow_mut().push(ic_cdk::caller());
    });

    id
}

#[query]
fn get_owner(id: u64) -> Principal {
    OWNERS.with(|owners| {
        owners
            .borrow()
            .get(id as usize)
            .copied()
            .unwrap_or_else(|| ic_cdk::trap("Owner not found for given ID"))
    })
}

#[query]
fn get_metadata(id: u64) -> LandMetadata {
    LANDS.with(|lands| {
        lands
            .borrow()
            .get(id as usize)
            .cloned()
            .unwrap_or_else(|| ic_cdk::trap("Metadata not found for given ID"))
    })
}

#[update]
fn transfer(id: u64, new_owner: Principal) -> bool {
    OWNERS.with(|owners| {
        let mut owners = owners.borrow_mut();
        if let Some(owner) = owners.get_mut(id as usize) {
            if *owner == ic_cdk::caller() {
                *owner = new_owner;
                return true;
            }
        }
        false
    })
}

#[update]
fn list_land(id: u64, price: u64) {
    LAND_LISTINGS.with(|listings| {
        listings.borrow_mut().insert(id, price);
    });
}

#[query]
fn get_listings() -> Vec<Listing> {
    LAND_LISTINGS.with(|listings| {
        listings
            .borrow()
            .iter()
            .map(|(id, price)| Listing {
                id: *id,
                price: *price,
            })
            .collect()
    })
}
