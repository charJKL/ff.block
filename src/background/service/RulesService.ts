import { LocalStorage, BrowserNativeApiCallError, RuleNotFound } from "@charjkl/browser.std/backend";
import { NetRequestBlock, NetRequestRuleDesc, RegexpIsNotSupported, GetRuleUniqueIdError} from "@charjkl/browser.std/backend";
import { DateEx, MapEx, Async, isError, isUndefined, MakeOptional, isObject } from "@charjkl/browser.std/util";


// types
export type UniqueIdString = string;
export type UniqueIdNumber = number;
export type Timestamp = number;
export type Rule = 
{
	id: UniqueIdString,
	netRequestId: UniqueIdNumber,
	time: Timestamp;
	regexp: string;
}
export type RuleDesc = 
{
	regexp: string;
}
export type NotRegistered<R extends Rule> = MakeOptional<R, "netRequestId">;
export type Rules = Map<UniqueIdString, Rule>;
export type RulesStorageBlueprint = { rules: Map<UniqueIdString, Rule>; };

// default values:
export const DefaultRules : Readonly<Rules> = new Map();

// errors:
export class UnwantedRuleWasNotFound extends Error { }; // TODO which error extend here?

/**
 * IRulesService
 */
interface IRulesService
{
	getRules() : Async<Rules, BrowserNativeApiCallError>;
	addRule(ruleDesc: RuleDesc) : Async<Rule, BrowserNativeApiCallError, RegexpIsNotSupported, GetRuleUniqueIdError>;
	removeRule(rule: {id: Rule["id"]} | Rule["id"]) : Async<NotRegistered<Rule>, BrowserNativeApiCallError, UnwantedRuleWasNotFound, RuleNotFound>;
}

/**
 * RulesService 
 */
export class RulesService implements IRulesService
{
	private $browserStorage : LocalStorage<RulesStorageBlueprint>;
	private $netRequestBlock : NetRequestBlock;
	
	public constructor(browserStoage: LocalStorage<RulesStorageBlueprint>, netRequestBlock: NetRequestBlock)
	{
		this.$browserStorage = browserStoage;
		this.$netRequestBlock = netRequestBlock;
	}
	
	public async getRules() : Async<Rules, BrowserNativeApiCallError>
	{
		const rules = await this.$browserStorage.get("rules");
		if(isError(BrowserNativeApiCallError, rules)) return rules;
		return rules;
	}
	
	public async addRule(ruleDesc: RuleDesc) : Async<Rule, BrowserNativeApiCallError, RegexpIsNotSupported, GetRuleUniqueIdError>
	{
		const rules = await this.$browserStorage.get("rules");
		if(isError(BrowserNativeApiCallError, rules)) return rules;
		
		const notRegisteredRule : NotRegistered<Rule> =
		{
			id: MapEx.getUniqueKey(rules),
			netRequestId: undefined, // will be known later after rule will be registered in NetRequestBlock.
			time: DateEx.getTimestamp(),
			regexp: ruleDesc.regexp
		}
		
		const netRequestRuleDesc : NetRequestRuleDesc = { regexp: notRegisteredRule.regexp };
		const result = await this.$netRequestBlock.addRule(netRequestRuleDesc);
		if(isError(BrowserNativeApiCallError, result)) return result;
		if(isError(RegexpIsNotSupported, result)) return result;
		if(isError(GetRuleUniqueIdError, result)) return result;
		
		const rule : Rule = { ...notRegisteredRule, netRequestId: result.id };
		rules.set(rule.id, rule);
		const save = await this.$browserStorage.set("rules", rules);
		if(isError(BrowserNativeApiCallError, save)) return save;
		return rule;
	}
	
	public async removeRule(ruleDesc: {id: Rule["id"]} | Rule["id"]) : Async<NotRegistered<Rule>, BrowserNativeApiCallError, UnwantedRuleWasNotFound, RuleNotFound>
	{
		const id = isObject(ruleDesc) ? ruleDesc.id : ruleDesc;
		const rules = await this.$browserStorage.get("rules");
		if(isError(BrowserNativeApiCallError, rules)) return rules;
		
		const rule = rules.get(id);
		if(isUndefined(rule)) return new UnwantedRuleWasNotFound();
		
		const netRequestRuleDesc = { id: rule.netRequestId };
		const result = await this.$netRequestBlock.removeRule(netRequestRuleDesc);
		if(isError(BrowserNativeApiCallError, result)) return result;
		if(isError(RuleNotFound, result)) return result;
		
		rules.delete(rule.id);
		const save = await this.$browserStorage.set("rules", rules);
		if(isError(BrowserNativeApiCallError, save)) return save;
		
		const notRegisteredRule : NotRegistered<Rule> = { ...rule, netRequestId: undefined }
		return notRegisteredRule;
	}
	
}