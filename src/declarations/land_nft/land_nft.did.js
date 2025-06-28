export const idlFactory = ({ IDL }) => {
  const Listing = IDL.Record({ 'id' : IDL.Nat64, 'price' : IDL.Nat64 });
  const LandMetadata = IDL.Record({
    'media_hash' : IDL.Text,
    'name' : IDL.Text,
    'size' : IDL.Text,
    'coordinates' : IDL.Text,
  });
  return IDL.Service({
    'buy_land' : IDL.Func([IDL.Nat64], [], []),
    'get_listings' : IDL.Func([], [IDL.Vec(Listing)], []),
    'get_metadata' : IDL.Func([IDL.Nat64], [LandMetadata], []),
    'get_owner' : IDL.Func([IDL.Nat64], [IDL.Principal], []),
    'list_land' : IDL.Func([IDL.Nat64, IDL.Nat64], [], []),
    'mint' : IDL.Func([LandMetadata], [IDL.Nat64], []),
    'transfer' : IDL.Func([IDL.Nat64, IDL.Principal], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
