import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./index";

describe("documentation homepage", () => {
  it("renders the hero content and CTA links", () => {
    render(<Home />);

    expect(
      screen.getByText("Autonomous", { exact: false }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Platform Documentation" }),
    ).toHaveAttribute("href", "/docs/Agent/architecture");
    expect(
      screen.getByRole("link", { name: "Interactive API (Swagger)" }),
    ).toHaveAttribute("href", "/docs/Swagger-API/aegis-ai-gateway-api");
    expect(screen.getByText("Microservices Core")).toBeInTheDocument();
  });
});
