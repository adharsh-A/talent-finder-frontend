import React from "react";

const ColorPalette = () => {
    const colors = {
        "--background": "hsl(0, 0%, 100%)",
        "--foreground": "hsl(0, 0%, 3.9%)",
        "--card": "hsl(0, 0%, 100%)",
        "--card-foreground": "hsl(0, 0%, 3.9%)",
        "--popover": "hsl(0, 0%, 100%)",
        "--popover-foreground": "hsl(0, 0%, 3.9%)",
        "--primary": "hsl(0, 0%, 9%)",
        "--primary-foreground": "hsl(0, 0%, 98%)",
        "--secondary": "hsl(0, 0%, 96.1%)",
        "--secondary-foreground": "hsl(0, 0%, 9%)",
        "--muted": "hsl(0, 0%, 96.1%)",
        "--muted-foreground": "hsl(0, 0%, 45.1%)",
        "--accent": "hsl(0, 0%, 96.1%)",
        "--accent-foreground": "hsl(0, 0%, 9%)",
        "--destructive": "hsl(0, 84.2%, 60.2%)",
        "--destructive-foreground": "hsl(0, 0%, 98%)",
        "--border": "hsl(0, 0%, 89.8%)",
        "--input": "hsl(0, 0%, 89.8%)",
        "--ring": "hsl(0, 0%, 3.9%)",
        "--radius": "0.5rem",
        "--chart-1": "hsl(12, 76%, 61%)",
        "--chart-2": "hsl(173, 58%, 39%)",
        "--chart-3": "hsl(197, 37%, 24%)",
        "--chart-4": "hsl(43, 74%, 66%)",
        "--chart-5": "hsl(27, 87%, 67%)",
      };
      

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h2>Color Palette</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
        {Object.keys(colors).map((color) => (
          <div
            key={color}
            style={{
              backgroundColor: colors[color],
              padding: "1rem",
              borderRadius: "var(--radius)",
              color: colors["--foreground"],
              textAlign: "center",
            }}
          >
            <strong>{color}</strong>
            <div>{colors[color]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
