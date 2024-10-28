import { RulesList } from "./main/RulesList";
import * as css from "./Main.module.css";

export function Main()
{
	return (
		<main className={css.main}>
			To jest main
			<RulesList />
		</main>
	);
}