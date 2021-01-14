export default class TileServer {
  private endpoint = "https://api.mapbox.com/styles";
  private version = "v1";
  private user = "mapbox";
  private style = "streets-v11";
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  public getURL(zoom: number, x: number, y: number, hires: boolean): string {
    return `${[
      this.endpoint, this.version, this.user, this.style,
      "tiles", zoom, x, y,
    ].join("/")}${hires ? "@2x" : ""}?access_token=${this.token}`;
  }

  public getTile(zoom: number, x: number, y: number, hires: boolean): Promise<HTMLImageElement> {
    return new Promise(resolve => {
      const img = new Image();
      img.addEventListener("load", () => resolve(img));
      img.crossOrigin = "anonymous";
      img.src = this.getURL(zoom, x, y, hires);
    });
  }
}
