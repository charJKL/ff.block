import { FrontendComm as ApiFrontendComm } from "@charjkl/browser.std/frontend";
import { CommProtocol } from "$src/CommProtocol";
import { useEffect, useState } from "react";

export function RulesList()
{
	const [rules, setRules] = useState<any[]>([]);
	
	const frontendComm = new ApiFrontendComm<CommProtocol>();
	
	
	useEffect(() => {
		frontendComm.sendMessage("GetRules").then((rules) => {
			if(rules instanceof Array)
			{
				setRules(rules);
			}
		});
	}, []);
	

	const list = rules.map((rule: any) => <div>{rule.id} - {rule.regexp}</div>)
	return (
		<div>
			Rules list
			{ list }
		</div>
	)
}