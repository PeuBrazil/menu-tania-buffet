import { ImageResponse } from "next/og";

export const alt = "Buffet da Tânia | Cardápio Artesanal para Festas e Eventos";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F5EFE6",
          padding: "44px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFFDF9",
            borderRadius: "36px",
            border: "4px solid #E4D6C3",
            padding: "48px 64px",
            textAlign: "center",
          }}
        >
          {/* Emblema Superior */}
          <div
            style={{
              width: "92px",
              height: "92px",
              borderRadius: "46px",
              backgroundColor: "#352119",
              border: "4px solid #E6B35A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "22px",
            }}
          >
            <span
              style={{
                fontSize: "52px",
                fontWeight: 800,
                color: "#E6B35A",
                fontFamily: "Georgia, serif",
              }}
            >
              T
            </span>
          </div>

          <div
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#C2593F",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            ★ Receitas de Família • Feito à Mão ★
          </div>

          <div
            style={{
              fontSize: "74px",
              fontWeight: 800,
              color: "#352119",
              fontFamily: "Georgia, serif",
              lineHeight: 1.05,
              marginBottom: "18px",
            }}
          >
            Buffet da Tânia
          </div>

          <div
            style={{
              fontSize: "28px",
              color: "#72554A",
              maxWidth: "820px",
              lineHeight: 1.35,
              marginBottom: "32px",
            }}
          >
            Salgados fritos, assados de forno, doces finos, tortas e vinagretes sob encomenda para sua festa.
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                backgroundColor: "#352119",
                color: "#FFFDF9",
                padding: "12px 26px",
                borderRadius: "999px",
                fontSize: "20px",
                fontWeight: 700,
              }}
            >
              Salgados Fritos & de Forno
            </div>
            <div
              style={{
                backgroundColor: "#C2593F",
                color: "#FFFDF9",
                padding: "12px 26px",
                borderRadius: "999px",
                fontSize: "20px",
                fontWeight: 700,
              }}
            >
              Doces & Trufas
            </div>
            <div
              style={{
                backgroundColor: "#EFE6D5",
                color: "#352119",
                padding: "12px 26px",
                borderRadius: "999px",
                fontSize: "20px",
                fontWeight: 700,
              }}
            >
              Tortas & Vinagretes
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
