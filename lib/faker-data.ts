
// type
export interface memeCoinsInterface  {
  id: string
  name: string
  handle: string
  image: string
  contractAddress: string
  timestamp: string
  hotpot: {
    status?: string
    verified?: boolean,
    renounced?: boolean,
    locked?: boolean,
    top10Percentage?: number
  },
  holdings: {
    dev?: number,
    insider?: number
  },
  tax: {
    buy?: number,
    sell?: number
  },
  socials: {
    twitter?: string
    website?: string
    telegram?: string
  },
  metrics: {
    liquidity?: number,
    holders?: number,
    volume?: number,
    marketCap?: number
  }
}
export const memeCoins:memeCoinsInterface[] = [
    {
      id: "0x94484998440",
      name: "PEPE 2.0",
      handle: "@pepe2",
      image: "/static/3717.png",
      contractAddress: "0x9448499844012345678901234567890123456789",
      timestamp: "01/22 04:31:11",
      hotpot: {
        status: "?",
        verified: true,
        renounced: false,
        locked: true,
        top10Percentage: 30
      },
      holdings: {
        dev: 2,
        insider: 0
      },
      tax: {
        buy: 0,
        sell: 0
      },
      socials: {
        twitter: "x.com/pepe2",
        website: "pepe2.network",
        telegram: "t.me/pepe2official"
      },
      metrics: {
        liquidity: 23100,
        holders: 99,
        volume: 2100,
        marketCap: 1100000
      }
    },
    {
      id: "0x83729477281",
      name: "DOGE KING",
      handle: "@dogeking",
      image: "/static/3124.webp",
      contractAddress: "0x8372947728112345678901234567890123456789",
      timestamp: "01/22 03:45:22",
      hotpot: {
        status: "?",
        verified: true,
        renounced: false,
        locked: true,
        top10Percentage: 25
      },
      holdings: {
        dev: 5,
        insider: 2
      },
      tax: {
        buy: 2,
        sell: 2
      },
      socials: {
        twitter: "x.com/dogeking",
        telegram: "t.me/dogekingofficial"
      },
      metrics: {
        liquidity: 45200,
        holders: 250,
        volume: 5600,
        marketCap: 2300000
      }
    },
    {
      id: "0x76123488901",
      name: "WOJAK",
      handle: "@wojakinu",
      image: "/static/3717.png",
      contractAddress: "0x7612348890112345678901234567890123456789",
      timestamp: "01/22 02:15:33",
      hotpot: {
        verified: true,
        locked: true,
        top10Percentage: 45
      },
      holdings: {
        dev: 8,
        insider: 5
      },
      tax: {
        buy: 3,
        sell: 3
      },
      socials: {
        twitter: "x.com/wojakinu"
      },
      metrics: {
        liquidity: 15600,
        holders: 156,
        volume: 1200,
        marketCap: 780000
      }
    },
    {
      id: "0x65234891077",
      name: "CHAD INU",
      handle: "@chadinu",
      image: "/static/3124.webp",
      contractAddress: "0x6523489107712345678901234567890123456789",
      timestamp: "01/22 01:20:45",
      hotpot: {
        status: "?",
        verified: true,
        renounced: true,
        top10Percentage: 20
      },
      holdings: {
        dev: 3
      },
      tax: {
        buy: 1,
        sell: 1
      },
      socials: {
        telegram: "t.me/chadinuofficial",
        website: "chadinu.com"
      },
      metrics: {
        liquidity: 34500,
        holders: 320,
        volume: 4300,
        marketCap: 1500000
      }
    },
    {
      id: "0x54123677233",
      name: "MOON DOGE",
      handle: "@moondoge",
      image: "/static/3717.png",
      contractAddress: "0x5412367723312345678901234567890123456789",
      timestamp: "01/21 23:55:12",
      hotpot: {
        verified: false,
        locked: false,
        top10Percentage: 60
      },
      holdings: {
        dev: 12,
        insider: 8
      },
      tax: {
        buy: 5,
        sell: 5
      },
      socials: {
        twitter: "x.com/moondoge",
        telegram: "t.me/moondoge"
      },
      metrics: {
        liquidity: 8900,
        holders: 89,
        volume: 890,
        marketCap: 450000
      }
    },
    {
      id: "0x43235789012",
      name: "SHIB 2K",
      handle: "@shib2k",
      image: "/static/3124.webp",
      contractAddress: "0x4323578901212345678901234567890123456789",
      timestamp: "01/21 22:30:18",
      hotpot: {
        status: "?",
        verified: true,
        renounced: true,
        locked: true,
        top10Percentage: 15
      },
      holdings: {
        dev: 1,
        insider: 0
      },
      tax: {
        buy: 0,
        sell: 0
      },
      socials: {
        twitter: "x.com/shib2k",
        website: "shib2k.io",
        telegram: "t.me/shib2kofficial"
      },
      metrics: {
        liquidity: 67800,
        holders: 567,
        volume: 8900,
        marketCap: 3400000
      }
    },
    {
      id: "0x32345678901",
      name: "BASED",
      handle: "@basedtoken",
      image: "/static/3717.png",
      contractAddress: "0x3234567890112345678901234567890123456789",
      timestamp: "01/21 21:15:44",
      hotpot: {
        verified: true,
        top10Percentage: 35
      },
      holdings: {
        dev: 4
      },
      tax: {
        buy: 2,
        sell: 2
      },
      socials: {
        telegram: "t.me/basedtoken"
      },
      metrics: {
        liquidity: 12300,
        holders: 145,
        volume: 1500,
        marketCap: 670000
      }
    },
    {
      id: "0x21234567890",
      name: "WOJAK PEPE",
      handle: "@wojakpepe",
      image: "/static/3124.webp",
      contractAddress: "0x2123456789012345678901234567890123456789",
      timestamp: "01/21 20:05:33",
      hotpot: {
        status: "?",
        locked: true,
        top10Percentage: 40
      },
      holdings: {
        dev: 6,
        insider: 3
      },
      tax: {
        buy: 4,
        sell: 4
      },
      socials: {
        twitter: "x.com/wojakpepe",
        website: "wojakpepe.net"
      },
      metrics: {
        liquidity: 23400,
        holders: 234,
        volume: 2800,
        marketCap: 890000
      }
    },
    {
      id: "0x10123456789",
      name: "MEME KING",
      handle: "@memeking",
      image: "/static/3717.png",
      contractAddress: "0x1012345678912345678901234567890123456789",
      timestamp: "01/21 19:45:21",
      hotpot: {
        verified: true,
        renounced: false,
        locked: true,
        top10Percentage: 28
      },
      holdings: {
        dev: 7
      },
      tax: {
        buy: 3,
        sell: 3
      },
      socials: {
        telegram: "t.me/memekingofficial",
        website: "memeking.io"
      },
      metrics: {
        liquidity: 43200,
        holders: 321,
        volume: 5400,
        marketCap: 1900000
      }
    },
    {
      id: "0x98765432109",
      name: "DOGE FLOKI",
      handle: "@dogefloki",
      image: "/static/3124.webp",
      contractAddress: "0x9876543210912345678901234567890123456789",
      timestamp: "01/21 18:30:15",
      hotpot: {
        status: "?",
        verified: true,
        top10Percentage: 50
      },
      holdings: {
        dev: 9,
        insider: 6
      },
      tax: {
        buy: 2,
        sell: 3
      },
      socials: {
        twitter: "x.com/dogefloki"
      },
      metrics: {
        liquidity: 18900,
        holders: 178,
        volume: 2100,
        marketCap: 560000
      }
    },
    {
      id: "0x98765432109",
      name: "ROSS",
      handle: "ROSS IS BACK",
      image: "/static/3124.webp",
      contractAddress: "0x9876543210912345678901234567890123456789",
      timestamp: "01/21 18:30:15",
      hotpot: {
        status: "?",
        verified: true,
        top10Percentage: 50
      },
      holdings: {
        dev: 9,
        insider: 6
      },
      tax: {
        buy: 2,
        sell: 3
      },
      socials: {
        twitter: "x.com/rose"
      },
      metrics: {
        liquidity: 18900,
        holders: 178,
        volume: 2100,
        marketCap: 560000
      }
    },
    {
      id: "0x987654321dd09",
      name: "Ink",
      handle: "INK WALLET",
      image: "/static/3124.webp",
      contractAddress: "0x9876543210912345678901234567890123456789",
      timestamp: "01/21 18:30:15",
      hotpot: {
        status: "?",
        verified: true,
        top10Percentage: 50
      },
      holdings: {
        dev: 9,
        insider: 6
      },
      tax: {
        buy: 2,
        sell: 3
      },
      socials: {
        twitter: "x.com/ink"
      },
      metrics: {
        liquidity: 18900,
        holders: 178,
        volume: 2100,
        marketCap: 560000
      }
    }
  ];