import Base from "./_base.ts";
import { decode } from "https://deno.land/std/encoding/utf8.ts";

export class Reader extends Base {
  /**
   * Initialize reader.
   * @param filename Filename
   */
  constructor(filename: string) {
    super();
    this.buf = Deno.readFileSync(filename);
  }

  /**
   * Read bytes from buffer.
   * @param length Length
   * @return Buffer
   */
  read(length: number): Uint8Array {
    let buf = this.buf.slice(this.offset, this.offset + length);
    this.offset += length;
    return buf;
  }

  /**
   * Read unsigned byte from buffer.
   * @return Unsigned byte
   */
  readUByte(): number {
    return this.buf[this.offset++];
  }

  /**
   * Read unsigned int16 from buffer.
   * @return Unsigned int16
   */
  readUInt16(): number {
    return (this.readUByte() | this.readUByte() << 8);
  }

  /**
   * Read unsigned int32 from buffer.
   * @return Unsigned int32
   */
  readUInt32(): number {
    return (this.readUByte() | this.readUByte() << 8 | this.readUByte() << 16 |
      this.readUByte() << 24);
  }

  /**
   * Read unsigned int64 from buffer.
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
   * Read UTF8 string from buffer.
   * @param length String length
   * @return String
   */
  readUTF8String(length: number): string {
    return decode(this.read(length));
  }

  /**
   * Read UTF8 Null-Terminated string from buffer.
   * @param nt Null-Terminated byte. Default 0
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
