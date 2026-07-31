import { ImageResponse } from "next/og";

export const socialImageAlt =
  "BOKIKOMI! Bookkeeping Level 3 manga-style lessons and quizzes";
export const socialImageSize = {
  width: 1200,
  height: 630,
};
export const socialImageContentType = "image/png";

export function createSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#fffaf0",
          color: "#171717",
          fontFamily: "sans-serif",
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -110,
            right: -90,
            width: 390,
            height: 390,
            borderRadius: 999,
            background: "#ffd84d",
            border: "8px solid #171717",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -150,
            left: 410,
            width: 330,
            height: 330,
            borderRadius: 999,
            background: "#3eb7e8",
            border: "8px solid #171717",
          }}
        />

        <div
          style={{
            width: "68%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            zIndex: 2,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                alignSelf: "flex-start",
                display: "flex",
                padding: "10px 18px",
                background: "#ffd84d",
                border: "4px solid #171717",
                fontSize: 24,
                fontWeight: 900,
                letterSpacing: 3,
              }}
            >
              FREE WEB APP
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 24,
                fontSize: 92,
                lineHeight: 1,
                fontWeight: 900,
                letterSpacing: -5,
              }}
            >
              BOKIKOMI!
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 14,
                fontSize: 38,
                fontWeight: 900,
                letterSpacing: 2,
                color: "#ff4b3e",
              }}
            >
              BOOKKEEPING LEVEL 3
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 18,
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              Manga-style lessons + quizzes
            </div>
          </div>

          <div style={{ display: "flex", gap: 14 }}>
            {[
              ["FOUNDATIONS", "#53c68c"],
              ["LEDGERS", "#9a7bd1"],
              ["CLOSING", "#ff4b3e"],
            ].map(([label, background]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  padding: "10px 16px",
                  background,
                  color: label === "CLOSING" ? "#ffffff" : "#171717",
                  border: "3px solid #171717",
                  fontSize: 18,
                  fontWeight: 900,
                  letterSpacing: 1,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            width: "32%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: 300,
              height: 390,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: 28,
              background: "#ffffff",
              border: "7px solid #171717",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 86,
                background: "#ff4b3e",
                color: "#ffffff",
                border: "4px solid #171717",
                fontSize: 34,
                fontWeight: 900,
              }}
            >
              DEBIT
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 86,
                background: "#3eb7e8",
                border: "4px solid #171717",
                fontSize: 34,
                fontWeight: 900,
              }}
            >
              CREDIT
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 86,
                background: "#ffd84d",
                border: "4px solid #171717",
                fontSize: 34,
                fontWeight: 900,
              }}
            >
              QUIZ!
            </div>
          </div>
        </div>
      </div>
    ),
    socialImageSize,
  );
}
