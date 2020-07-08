import React from "react";

import { App, Button } from "..";
import { Intent } from "../../enums";

export default { component: Button, title: "Button" };

export const standard = (): JSX.Element => {
    return (
        <App>
            <main
                style={{
                    alignItems: "start",
                    display: "flex",
                    flexDirection: "column",
                    padding: "1rem",
                }}
            >
                <Button intent={Intent.Primary}>Primary</Button>
                <br />
                <Button intent={Intent.Secondary}>Secondary</Button>
                <br />
                <Button intent={Intent.Success}>Success</Button>
                <br />
                <Button intent={Intent.Warning}>Warning</Button>
                <br />
                <Button intent={Intent.Danger}>Danger</Button>
                <br />
                <Button disabled>Disabled</Button>
            </main>
        </App>
    );
};
