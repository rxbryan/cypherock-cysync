import erc20List from './erc20.json';

import { coinFamiliesMap, ICoinInfo, ICoinUnit } from '../types';

export interface IEvmErc20Token extends ICoinInfo {
  parentId: string;
  address: string;
}

const units: ICoinUnit[] = [
  {
    name: 'Gwei',
    abbr: 'Gwei',
    magnitude: 9,
  },
  {
    name: 'Mwei',
    abbr: 'Mwei',
    magnitude: 6,
  },
  {
    name: 'Kwei',
    abbr: 'Kwei',
    magnitude: 3,
  },
  {
    name: 'wei',
    abbr: 'wei',
    magnitude: 0,
  },
];

export const getErc20Tokens = (
  parentId: string,
  parentCoinInfo: { color: string },
) => {
  const tokensById: Record<string, IEvmErc20Token> = {};
  const tokensByContract: Record<string, IEvmErc20Token> = {};
  const tokensList: any = erc20List;

  for (const token of tokensList) {
    if (token.symbol.length <= 16 && token.platforms[parentId]) {
      if (
        !token.platforms[parentId].contract_address ||
        [null, undefined].includes(token.platforms[parentId].decimal_place)
      ) {
        throw new Error('Missing token data');
      }

      const id = `${parentId}:${token.id}`;
      const tokenObj: IEvmErc20Token = {
        id,
        parentId,
        name: token.name,
        abbr: token.symbol.toUpperCase(),
        coinGeckoId: token.id,
        address: token.platforms[parentId].contract_address,
        coinIndex: '',
        feesUnit: 'Gwei',
        family: coinFamiliesMap.evm,
        isTest: false,
        units: [
          {
            name: token.name,
            abbr: token.symbol.toUpperCase(),
            magnitude: token.platforms[parentId].decimal_place,
          },
          ...units,
        ],
        color: parentCoinInfo.color,
      };
      tokensById[id] = tokenObj;
      tokensByContract[tokenObj.address.toLowerCase()] = tokenObj;
    }
  }

  return { tokens: tokensById, tokensByContract };
};

export const erc20Abi = [
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        name: 'success',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    type: 'function',
  },
];