import {khala, khalaDev} from '@phala/typedefs'
import {EthereumNetworkOptions, SubstrateNetworkOptions} from './configuration'

export const ethereums: Record<string, EthereumNetworkOptions> = {
  // 42: {
  //   bridge: '0xC84456ecA286194A201F844993C220150Cf22C63',
  //   erc20: '0x6c5ba91642f10282b576d91922ae6448c9d52f4e',
  //   erc20AssetHandler: '0x6eD3bc069Cf4F87DE05c04C352E8356492EC6eFE',
  //   erc20ResourceId:
  //     '0x00000000000000000000000000000063a7e2be78898ba83824b0c0cc8dfb6001',
  //   peerChainIds: {
  //     'khala-pc-test': 1,
  //   },
  //   graph: {
  //     endpoint: 'https://graphs-api.phala.network/subgraphs/name/chainbridge',
  //   },
  // },
  42: {
    bridge: '0xe5F54e020f3E4964Ba11D269Cdda602A78d09917',
    erc20: '0x512f7a3c14b6ee86c2015bc8ac1fe97e657f75f2',
    erc20AssetHandler: '0xDf2E83f33dB8A9CcF3a00FCe18C3F509b974353D',
    erc20ResourceId:
      '0x00000000000000000000000000000063a7e2be78898ba83824b0c0cc8dfb6001',
    peerChainIds: {
      'khala-pc-test': 0,
    },
    graph: {
      endpoint: 'https://graphs-api.phala.network/subgraphs/name/chainbridge',
    },
  },
  1: {
    bridge: '0xC84456ecA286194A201F844993C220150Cf22C63',
    erc20: '0x6c5ba91642f10282b576d91922ae6448c9d52f4e',
    erc20AssetHandler: '0x6eD3bc069Cf4F87DE05c04C352E8356492EC6eFE',
    erc20ResourceId:
      '0x00000000000000000000000000000063a7e2be78898ba83824b0c0cc8dfb6001',
    peerChainIds: {
      khala: 1,
    },
    graph: {
      endpoint: 'https://graphs-api.phala.network/subgraphs/name/chainbridge',
    },
  },
}

export const substrates: Record<string, SubstrateNetworkOptions> = {
  'poc4-dev': {
    endpoint:
      process.env['PHALA_ENDPOINT'] ?? 'wss://poc4-dev.phala.network/ws',
    peerChainIds: {
      42: 0,
    },
    typedefs: khalaDev,
  },
  khala: {
    endpoint:
      process.env['PHALA_ENDPOINT'] ?? 'wss://khala-api.phala.network/ws',
    peerChainIds: {
      1: 0,
    },
    typedefs: khala,
  },
  'khala-pc-test': {
    // chainId: 1,
    graph: {
      endpoint: 'https://chainbridge-substrate-graph-testing.phala.works/',
    },
    peerChainIds: {
      42: 0,
    },
    endpoint: 'wss://pc-test-2.phala.network/khala/ws',
    typedefs: khalaDev,
  },
  para2: {
    endpoint: 'wss://para2-api.phala.network/ws/',
    peerChainIds: {1: 0},
    typedefs: khalaDev,
  },
}
