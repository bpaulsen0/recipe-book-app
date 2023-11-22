import { toggleBoolean } from "../utils";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { WelcomePage } from "./WelcomePage";
import React from "react";
import { RecipeSearch } from "./RecipeSearch";
import { AppProvider, useApp } from "./RealmApp";
import { ThemeProvider } from "./Theme";
import { AppName } from "./AppName";
import atlasConfig from "../atlasConfig.json";
import "./App.css";
import { AddRecipe } from "./AddRecipe";
const { appId } = atlasConfig;

export default function ProvidedApp() {
  return (
    <ThemeProvider>
      <AppProvider appId={appId}>
        <App />
      </AppProvider>
    </ThemeProvider>
  );
}

function App() {
  const { currentUser, logOut } = useApp();

  const [isViewRec, setIsViewRec] = React.useState(false);
  const toggleIsViewRec = () => {
    setIsViewRec(toggleBoolean);
  };
  const [isAddRec, setIsAddRec] = React.useState(false);
  const toggleIsAddRec = () => {
    setIsAddRec(toggleBoolean);
  };
  // const user = currentUser._profile.data.email
  // console.log(currentUser._profile.data.email);
  return (
    <>
      <div className="App">
        <AppBar position="sticky">
          
          <div className="toolbar">

            <AppName />
            {currentUser ? (
              <div>
                <p>Logged in as: {currentUser._profile.data.email}</p>
                {currentUser._profile.data.email == "Guest" ? null : <Button
                  className="buttons"
                  onClick={() => toggleIsAddRec()}
                >
                  <Typography variant="button">Add Recipe</Typography>
                </Button>}
                <Button
                  className="buttons"
                  onClick={async () => {
                    await logOut();
                    setIsAddRec(false)
                  }}
                >
                  <Typography variant="button">Log Out</Typography>
                </Button>
              </div>
            ) : null}
          </div>
        </AppBar>  
        {isAddRec && currentUser ? <div className="Popup"> <div className="Dialog"><AddRecipe /></div></div> : null}
        {currentUser ? <RecipeSearch /> : <WelcomePage /> }
      </div>
    </>
  );
}
