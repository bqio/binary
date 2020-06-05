export default class Serializer {
  static serialize(obj: object): Uint8Array {
    const str = JSON.stringify(obj);
    const encoder = new TextEncoder();
    return new Uint8Array(encoder.encode(str));
  }

  static deserialize(bytes: Uint8Array, type: any): any {
    const decoder = new TextDecoder();
    const obj = JSON.parse(decoder.decode(bytes));
    return Object.assign(new type(), obj);
  }
}
