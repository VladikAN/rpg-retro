import Phaser from "phaser";

export function bootArena(parent: HTMLElement): () => void {
  class PlaceholderScene extends Phaser.Scene {
    public constructor() {
      super({ key: "arena-placeholder" });
    }

    public create(): void {
      const { width, height } = this.scale;
      this.add
        .text(width / 2, height / 2, "Arena — Phaser (lazy-loaded)", {
          fontFamily: "system-ui, sans-serif",
          fontSize: "18px",
          color: "#e2e8f0",
        })
        .setOrigin(0.5);
    }
  }

  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    width: 800,
    height: 450,
    backgroundColor: "#0f172a",
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [PlaceholderScene],
  });

  return () => {
    game.destroy(true);
  };
}
