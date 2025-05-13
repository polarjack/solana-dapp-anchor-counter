/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/counter.json`.
 */
export type Counter = {
  "address": "8QGkPECmVESqtwtGu8bYQUEgZPfNBGdy3GmEn76FF7yG",
  "metadata": {
    "name": "counter",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "cancelRedeemRequest",
      "discriminator": [
        71,
        179,
        227,
        47,
        165,
        227,
        81,
        85
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "counter",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "close",
      "discriminator": [
        98,
        165,
        201,
        177,
        108,
        65,
        206,
        96
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "counter",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "decrement",
      "discriminator": [
        106,
        227,
        168,
        59,
        248,
        27,
        150,
        101
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "counter",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "increment",
      "discriminator": [
        11,
        18,
        104,
        9,
        104,
        174,
        59,
        33
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "counter",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "counter",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "mint",
      "discriminator": [
        51,
        57,
        225,
        47,
        182,
        146,
        137,
        166
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "counter",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "requestRedeem",
      "discriminator": [
        105,
        49,
        44,
        38,
        207,
        241,
        33,
        173
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "counter",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "set",
      "discriminator": [
        198,
        51,
        53,
        241,
        116,
        29,
        126,
        194
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "counter",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "value",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "counter",
      "discriminator": [
        255,
        176,
        4,
        245,
        188,
        253,
        124,
        25
      ]
    }
  ],
  "events": [
    {
      "name": "countTriggered",
      "discriminator": [
        187,
        79,
        72,
        84,
        111,
        143,
        63,
        18
      ]
    },
    {
      "name": "counterClosed",
      "discriminator": [
        61,
        84,
        59,
        97,
        131,
        189,
        51,
        193
      ]
    },
    {
      "name": "counterCreated",
      "discriminator": [
        71,
        205,
        148,
        94,
        172,
        160,
        252,
        170
      ]
    },
    {
      "name": "counterSet",
      "discriminator": [
        181,
        138,
        142,
        124,
        29,
        229,
        27,
        239
      ]
    },
    {
      "name": "redeemRequested",
      "discriminator": [
        5,
        130,
        67,
        249,
        243,
        168,
        11,
        88
      ]
    },
    {
      "name": "userPositionUpdated",
      "discriminator": [
        103,
        32,
        177,
        181,
        186,
        180,
        198,
        99
      ]
    }
  ],
  "types": [
    {
      "name": "countTriggered",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "signer",
            "type": "pubkey"
          },
          {
            "name": "counter",
            "type": "pubkey"
          },
          {
            "name": "count",
            "type": "u8"
          },
          {
            "name": "increment",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "counter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "count",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "counterClosed",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "signer",
            "type": "pubkey"
          },
          {
            "name": "counter",
            "type": "pubkey"
          },
          {
            "name": "count",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "counterCreated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "signer",
            "type": "pubkey"
          },
          {
            "name": "counter",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "counterSet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "signer",
            "type": "pubkey"
          },
          {
            "name": "counter",
            "type": "pubkey"
          },
          {
            "name": "count",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "redeemRequested",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "signer",
            "type": "pubkey"
          },
          {
            "name": "market",
            "type": "pubkey"
          },
          {
            "name": "strategyGroup",
            "type": "pubkey"
          },
          {
            "name": "redeemRequest",
            "type": "pubkey"
          },
          {
            "name": "userPosition",
            "type": "pubkey"
          },
          {
            "name": "underlyingTokenMint",
            "type": "pubkey"
          },
          {
            "name": "syntheticMint",
            "type": "pubkey"
          },
          {
            "name": "syntheticAmountBurned",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "userPositionUpdated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "signer",
            "type": "pubkey"
          },
          {
            "name": "market",
            "type": "pubkey"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "strategyGroup",
            "type": "pubkey"
          },
          {
            "name": "userPosition",
            "type": "pubkey"
          },
          {
            "name": "syntheticAmount",
            "type": "u64"
          },
          {
            "name": "isIncrease",
            "type": "bool"
          }
        ]
      }
    }
  ]
};
