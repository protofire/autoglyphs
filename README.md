# Autoglyphs
_Made by Protoire.io under MIT License_

"Autoglyphs are an experiment in generative art, each one unique and created by code running on the Ethereum blockchain."
 > https://www.larvalabs.com/autoglyphs


This subgraph provide an standard erc-721 implementation, providing info about minting, transfer, bruning, approval. Additionally, this subgraph offers metadata about the transfers such as TransactionMeta and Block entities. The main feature of the autogplyphs platform is the uri, the token's art represented as string is also included

Thys subgraph rely's on this contract:
- Autoglyphs: 0xd4e4078ca3495de5b1d4db434bebc5a986197782

## Transaction

	Transfer(indexed address,indexed address,indexed uint256)

This interface provides useful information about basic Ercc-721 operations. 

Please see the TransactionMeta entity to get info about the chain's transactions

Relates to a "from" account, a "to" account, a block and a token. 

The transaction interface provides additional support trough the following entities:

	Mint, Burn, Transfer

## Account

	Approval(indexed address,indexed address,indexed uint256)

This entity provides information about ethereum's external accounts which can hold and transfer tokens. This entity is related to the Mint, Transfer, Burn and Token entities.

In order to transfer a token, the account must be represented as "operator" or "owner" in the Token entity.

## OperatorOwner

	ApprovalForAll(indexed address,indexed address,bool)

In order to support "approval for all" Accounts are related as "many to many" using the OperatorOwner entity.

## Token

	Generated(indexed uint256,indexed address,string)

The Token entity provides an standard erc-721 token interface wich also holds the uri, an string representation of the nft's art.

## Other entities

In order to provide additional info, the Block and TransactionMeta entities are added. The first one contains info about block number's and timestamp. The other one contains information about chain's transacion such as hash, gasUsed, etc.

## Example Queries


```graphql
# working with Transactions
{
   Transactions
	   id
	   type
	   ...on Mint{
		   to {
			   address
		   }
	   }
	   ...on Burn{
		   form {
			   address
		   }
	   }
	   ...on Transfer{
		   from{
			   address
		   }
		   to{
			   address
		   }
	   }
   }
}
```


```graphql
# working with accounts
{
   accounts{
	   sent{
		   token {
			   uri
		   }
	   }
	   recieved {
		   block {
			   number
		   }
	   }
	   approved {
		   token {
			   id
		   }
	   }
   }	  
}
```


```graphql
# working with Tokens
{
   tokens{
	   owner {
		   address
	   }
	   burned
	   uri
   }
}
```