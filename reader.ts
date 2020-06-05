import Stream from "./_stream.ts";
import { decode } from "https://deno.land/std/encoding/utf8.ts";

export class Reader extends Stream {
  /**
   * Initialize binary reader.
   * @param filename Filename
   */
  constructor(filename: string) {
    super();
    this.buffer = Deno.readFileSync(filename);
  }

  /**
   * Read bytes from stream.
   * @param count Bytes count
   * @return Byte array
   */
  read(count: number): Uint8Array {
    let buf = this.buffer.slice(this.offset, this.offset + count);
    this.offset += count;
    return buf;
  }

  /**
   * Read unsigned byte from stream.
   * @return Unsigned byte
   */
  readUByte(): number {
    return this.buffer[this.offset++];
  }

  /**
   * Read unsigned int16 from stream.
   * @return Unsigned int16
   */
  readUInt16(): number {
    return (this.readUByte() | this.readUByte() << 8);
  }

  /**
   * Read unsigned int32 from stream.
   * @return Unsigned int32
   */
  readUInt32(): number {
    return (this.readUByte() | this.readUByte() << 8 | this.readUByte() << 16 |
      this.readUByte() << 24);
  }

  /**
   * Read unsigned int64 from stream.
   * @return Unsigned int64
   */
  readUInt64(): bigint {
    const lo =
      (this.readUByte() | this.readUByte() << 8 | this.readUByte() << 16 |
        this.readUByte() << 24);
    const hi =
      (this.readUByte() | this.readUByte() << 8 | this.readUByte() << 16 |
        this.readUByte() << 24);
    return BigInt(hi) << BigInt(32) | BigInt(lo);
  }

  /**
   * Read UTF8 string from stream.
   * @param length String length
   * @return String
   */
  readUTF8String(length: number): string {
    return decode(this.read(length));
  }

  /**
   * Read UTF8 Null-Terminated string from stream.
   * @param nt Null-Terminated byte. Default 0.
   * @return String
   */
  readUTF8StringNT(nt: number = 0): string {
    let startPos = this.offset;
    while (this.readUByte() != nt) {}
    let endPos = this.offset;
    this.offset = startPos;
    return this.readUTF8String(endPos - startPos);
  }
}
