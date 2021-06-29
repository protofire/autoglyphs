import { Bytes } from '@graphprotocol/graph-ts';
import { Account, OperatorOwner } from '../../../generated/schema'

export namespace accounts {

	export namespace helpers {

		export function getOperatorOwnerId(
			ownerId: string,
			operatorId: string
		): string {
			return ownerId.concat("-".concat(operatorId))
		}

	}

	export function getOrCreateAccount(accountAddress: Bytes): Account {
		let accountId = accountAddress.toHex()

		let account = Account.load(accountId)
		if (account == null) {
			account = new Account(accountId)
			account.address = accountAddress
		}
		return account as Account
	}


	export function getOrCreateOperatorOwner(
		ownerId: string, operatorId: string,
		approved: boolean
	): OperatorOwner {
		let operatorOwnerId = helpers.getOperatorOwnerId(ownerId, operatorId)
		let operatorOwner = OperatorOwner.load(operatorOwnerId)
		if (operatorOwner == null) {
			operatorOwner = new OperatorOwner(operatorOwnerId)
			operatorOwner.owner = ownerId
			operatorOwner.operator = operatorId
		}
		operatorOwner.approved = approved
		return operatorOwner as OperatorOwner
	}
}