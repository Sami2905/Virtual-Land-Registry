import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface LandMetadata {
  'media_hash' : string,
  'name' : string,
  'size' : string,
  'coordinates' : string,
}
export interface Listing { 'id' : bigint, 'price' : bigint }
export interface _SERVICE {
  'buy_land' : ActorMethod<[bigint], undefined>,
  'get_listings' : ActorMethod<[], Array<Listing>>,
  'get_metadata' : ActorMethod<[bigint], LandMetadata>,
  'get_owner' : ActorMethod<[bigint], Principal>,
  'list_land' : ActorMethod<[bigint, bigint], undefined>,
  'mint' : ActorMethod<[LandMetadata], bigint>,
  'transfer' : ActorMethod<[bigint, Principal], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
