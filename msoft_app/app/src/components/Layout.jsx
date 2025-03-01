import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const fetchToken = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently({});

          setToken(accessToken);

          const response = await fetch(
            "https://dev-xixaidu4.us.auth0.com/userinfo",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            throw new Error("Error fetching user info");
          }

          const data = await response.json();
          setUserInfo(data);
          console.log(userInfo);
        } catch (error) {
          console.error("Error fetching the access token:", error);
        }
      }
    };

    fetchToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  console.log(token);
  return (
    <div className="bg-white flex flex-col min-h-screen bg-gray-100">
      <nav className="w-full bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-white text-2xl font-bold">
            my-app
          </a>
          <div className="flex items-center">
            <a href="/cursos" className="text-white mr-4">
              Cursos
            </a>
            <a href="/estudiantes" className="text-white mr-4">
              Estudiantes
            </a>

            {isAuthenticated ? (
              <div className="flex items-center">
                <span className="text-white mr-4">Hola, {user.name}</span>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={() => loginWithRedirect()}
              >
                Iniciar sesión
              </button>
            )}
          </div>
        </div>
      </nav>
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
