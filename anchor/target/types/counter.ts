/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/counter.json`.
 */
export type Counter = {
  "address": "4Wd2PN6cv3bg6ZTQaVveR3thSjrU3F1pYFx5BotbCsHU",
  "metadata": {
    "name": "counter",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
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
          "name": "counter",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "value",
          "type": "u16"
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
            "type": "u16"
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
            "type": "u16"
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
            "type": "u16"
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
            "type": "u16"
          }
        ]
      }
    }
  ]
};
