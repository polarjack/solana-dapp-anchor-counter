#![allow(clippy::result_large_err)]
pub mod event;

use crate::event::*;

use anchor_lang::prelude::*;

declare_id!("FkoYkKcUGvX31329BDmEULoGCHkPZrhGdvdoMofi6BQ9");

#[program]
pub mod counter {
    use super::*;

    pub fn close(_ctx: Context<CloseCounter>) -> Result<()> {
        emit!(CounterClosed {
            signer: _ctx.accounts.payer.key(),
            counter: _ctx.accounts.counter.key(),
            count: _ctx.accounts.counter.count,
        });

        Ok(())
    }

    pub fn decrement(ctx: Context<Update>) -> Result<()> {
        ctx.accounts.counter.count = ctx.accounts.counter.count.checked_sub(1).unwrap();

        emit!(CountTriggered {
            signer: ctx.accounts.counter.to_account_info().key(),
            counter: ctx.accounts.counter.to_account_info().key(),
            count: ctx.accounts.counter.count,
            increment: false,
        });

        Ok(())
    }

    pub fn increment(ctx: Context<Update>) -> Result<()> {
        ctx.accounts.counter.count = ctx.accounts.counter.count.checked_add(1).unwrap();

        emit!(CountTriggered {
            signer: ctx.accounts.counter.to_account_info().key(),
            counter: ctx.accounts.counter.to_account_info().key(),
            count: ctx.accounts.counter.count,
            increment: true,
        });

        Ok(())
    }

    pub fn initialize(_ctx: Context<InitializeCounter>) -> Result<()> {
        emit!(CounterCreated {
            signer: _ctx.accounts.payer.key(),
            counter: _ctx.accounts.counter.key(),
        });

        Ok(())
    }

    pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
        ctx.accounts.counter.count = value.clone();
        emit!(CounterSet {
            signer: ctx.accounts.counter.to_account_info().key(),
            counter: ctx.accounts.counter.to_account_info().key(),
            count: value,
        });

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeCounter<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
  init,
  space = 8 + Counter::INIT_SPACE,
  payer = payer
  )]
    pub counter: Account<'info, Counter>,
    pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseCounter<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
    pub counter: Account<'info, Counter>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub counter: Account<'info, Counter>,
}

#[account]
#[derive(InitSpace)]
pub struct Counter {
    count: u8,
}
