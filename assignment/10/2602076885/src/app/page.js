"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px 20px",
          background:
            "linear-gradient(135deg, #0f172a 0%, #172554 50%, #14532d 100%)",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              marginBottom: "20px",
            }}
          >
            ⚽🌍
          </div>

          <h1
            style={{
              fontSize: "clamp(40px, 7vw, 72px)",
              fontWeight: "800",
              lineHeight: "1.1",
              marginBottom: "25px",
            }}
          >
            Welcome to the
            <br />
            World Cup Fan Hub
          </h1>

          <p
            style={{
              fontSize: "20px",
              color: "#cbd5e1",
              maxWidth: "650px",
              margin: "0 auto 35px",
              lineHeight: "1.7",
            }}
          >
            Your home for football stories, unforgettable moments, and
            everything that makes the World Cup special.
          </p>

          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "14px 28px",
              background: "#22c55e",
              color: "white",
              textDecoration: "none",
              borderRadius: "10px",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Explore World Cup Stories →
          </Link>
        </div>
      </section>

      {/* World Cup Highlights */}
      <section
        style={{
          padding: "70px 20px",
          background: "#0f172a",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#22c55e",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "2px",
              marginBottom: "10px",
            }}
          >
            The FIFA World Cup 2026
          </p>

          <h2
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              marginBottom: "15px",
            }}
          >
            The World's Biggest Football Stage
          </h2>

          <p
            style={{
              color: "#94a3b8",
              maxWidth: "650px",
              margin: "0 auto 45px",
              lineHeight: "1.7",
            }}
          >
            The World Cup brings together the best national teams and millions
            of passionate football fans from around the world.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            <div
              style={{
                background: "#1e293b",
                padding: "30px 20px",
                borderRadius: "16px",
              }}
            >
              <div style={{ fontSize: "40px", marginBottom: "10px" }}>🌍</div>

              <h3
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                48
              </h3>

              <p style={{ color: "#94a3b8" }}>Teams</p>
            </div>

            <div
              style={{
                background: "#1e293b",
                padding: "30px 20px",
                borderRadius: "16px",
              }}
            >
              <div style={{ fontSize: "40px", marginBottom: "10px" }}>🏟️</div>

              <h3
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                104
              </h3>

              <p style={{ color: "#94a3b8" }}>Matches</p>
            </div>

            <div
              style={{
                background: "#1e293b",
                padding: "30px 20px",
                borderRadius: "16px",
              }}
            >
              <div style={{ fontSize: "40px", marginBottom: "10px" }}>🗺️</div>

              <h3
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                3
              </h3>

              <p style={{ color: "#94a3b8" }}>Host Countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Stories */}
      <section
        style={{
          padding: "70px 20px",
          background: "#020617",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "45px",
            }}
          >
            <p
              style={{
                color: "#22c55e",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "10px",
              }}
            >
              Stories
            </p>

            <h2
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                marginBottom: "15px",
              }}
            >
              Latest World Cup Stories
            </h2>

            <p
              style={{
                color: "#94a3b8",
              }}
            >
              A few stories that capture the magic of football.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "25px",
            }}
          >
            <div
              style={{
                background: "#1e293b",
                padding: "30px",
                borderRadius: "16px",
              }}
            >
              <div
                style={{
                  fontSize: "36px",
                  marginBottom: "20px",
                }}
              >
                ⚽
              </div>

              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  marginBottom: "12px",
                }}
              >
                Ballon D'or 2026
              </h3>

              <p
                style={{
                  color: "#94a3b8",
                  lineHeight: "1.7",
                }}
              >
                Who wins the 2026 Ballon D'or? 👀
              </p>
            </div>

            <div
              style={{
                background: "#1e293b",
                padding: "30px",
                borderRadius: "16px",
              }}
            >
              <div
                style={{
                  fontSize: "36px",
                  marginBottom: "20px",
                }}
              >
                🏆
              </div>

              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  marginBottom: "12px",
                }}
              >
                A New Generation Rises
              </h3>

              <p
                style={{
                  color: "#94a3b8",
                  lineHeight: "1.7",
                }}
              >
                Spain defeat the champions and win the World Cup after a
                dramatic final.
              </p>
            </div>

            <div
              style={{
                background: "#1e293b",
                padding: "30px",
                borderRadius: "16px",
              }}
            >
              <div
                style={{
                  fontSize: "36px",
                  marginBottom: "20px",
                }}
              >
                ❤️
              </div>

              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  marginBottom: "12px",
                }}
              >
                It's 2 Million Already!
              </h3>

              <p
                style={{
                  color: "#94a3b8",
                  lineHeight: "1.7",
                }}
              >
                Cape Verde goalkeeper @vozinha1 had 50k followers before the game against Spain. After his heroic Player of the Match performance, he's now surpassed 1.9M followers... and counting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section
        style={{
          padding: "80px 20px",
          textAlign: "center",
          background: "#14532d",
        }}
      >
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          {user ? (
            <>
              <h2
                style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                  marginBottom: "15px",
                }}
              >
                Welcome Back! 👋
              </h2>

              <p
                style={{
                  color: "#bbf7d0",
                  fontSize: "18px",
                  marginBottom: "30px",
                }}
              >
                Ready to explore the World Cup and your fan profile?
              </p>

              <Link
                href="/profile"
                style={{
                  display: "inline-block",
                  padding: "14px 28px",
                  background: "white",
                  color: "#14532d",
                  textDecoration: "none",
                  borderRadius: "10px",
                  fontWeight: "bold",
                }}
              >
                View My Profile
              </Link>
            </>
          ) : (
            <>
              <h2
                style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                  marginBottom: "15px",
                }}
              >
                Join the Fan Community ⚽
              </h2>

              <p
                style={{
                  color: "#bbf7d0",
                  fontSize: "18px",
                  marginBottom: "30px",
                }}
              >
                Create your account and become part of the World Cup Fan Hub.
              </p>

              <Link
                href="/register"
                style={{
                  display: "inline-block",
                  padding: "14px 28px",
                  background: "white",
                  color: "#14532d",
                  textDecoration: "none",
                  borderRadius: "10px",
                  fontWeight: "bold",
                }}
              >
                Create Your Account
              </Link>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
