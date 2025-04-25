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
    pub count: u16,
}

#[event]
pub struct CountTriggered {
    pub signer: Pubkey,
    pub counter: Pubkey,
    pub count: u16,
    pub increment: bool,
}

#[event]
pub struct CounterSet {
    pub signer: Pubkey,
    pub counter: Pubkey,
    pub count: u16,
}