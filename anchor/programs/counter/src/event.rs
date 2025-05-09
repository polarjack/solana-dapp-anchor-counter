use anchor_lang::prelude::*;


#[event]
pub struct CounterCreated {
    pub signer: Pubkey,
    pub counter: Pubkey,
}

#[event]
pub struct CounterClosed {
    pub signer: Pubkey,
    pub counter: Pubkey,
    pub count: u8,
}

#[event]
pub struct CountTriggered {
    pub signer: Pubkey,
    pub counter: Pubkey,
    pub count: u8,
    pub increment: bool,
}

#[event]
pub struct CounterSet {
    pub signer: Pubkey,
    pub counter: Pubkey,
    pub count: u8,
}

#[event]
pub struct UserPositionUpdated {
    pub signer: Pubkey,
    pub market: Pubkey,
    pub owner: Pubkey,
    pub strategy_group: Pubkey,
    pub user_position: Pubkey,
    pub synthetic_amount: u64,
    pub is_increase: bool,
}