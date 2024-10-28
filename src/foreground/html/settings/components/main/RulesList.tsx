import { FrontendComm as ApiFrontendComm } from "@charjkl/browser.std/frontend";
import { SupportedMessages, SupportedNotifications } from "../../../../../CommProtocol"; // change base path resolve, I plan about to do it.
import { useState } from "react";

export function RulesList()
{
	const [rules, setRules] = useState<any>([]);
	const FrontendComm = new ApiFrontendComm<SupportedMessages, SupportedNotifications>();

	FrontendComm.sendMessage("GetRules", []).then((rules) => {
		console.log("after reslolve", rules);
		setRules(rules); // TODO rule will be separate component
	})
	
	const list = rules.map((rule: any) => <div>{rule.id} - {rule.regexp}</div>)
	return (
		<div>
			Rules list
			{ list }
		</div>
	)
}