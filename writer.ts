import Base from "./_base.ts";
import { buf_append, buf_write, long_to_buf } from "./_utils.ts";
import { encode } from "https://deno.land/std/encoding/utf8.ts";

export class Writer extends Base {
  /**
   * Initialize writer.
   * @param filename Filename
   */
  constructor(readonly filename: string) {
    super();
  }

  /**
   *  Write bytes in buffer.
   * @param bytes Bytes array
   * @return Bytes count
   */
  write(bytes: number[] | Uint8Array): number {
    this.buf = buf_write(this.buf, bytes, this.offset);
    this.offset += bytes.length;
    return bytes.length;
  }

  /**
   *  Write unsigned byte in buffer.
   * @param byte Unsigned byte
   */
  writeUByte(byte: number): void {
    this.buf = buf_write(this.buf, [byte], this.offset);
    this.offset++;
  }

  /**
   *  Write unsigned int16 in buffer.
   * @param num Unsigned int16
   */
  writeUInt16(num: number): void {
    this.buf = buf_write(this.buf, [num, num >> 8], this.offset);
    this.offset += 2;
  }

  /**
   *  Write unsigned int32 in buffer.
   * @param num Unsigned int32
   */
  writeUInt32(num: number): void {
    this.buf = buf_write(
      this.buf,
      [num, num >> 8, num >> 16, num >> 24],
      this.offset,
    );
    this.offset += 4;
  }

  /**
   *  Write unsigned int64 in buffer.
   * @param long Unsigned int64
   */
  writeUInt64(long: bigint): void {
    this.buf = buf_write(
      this.buf,
      long_to_buf(long),
      this.offset,
    );
    this.offset += 8;
  }

  /**
   *  Write UTF8 string in buffer.
   * @param str String
   * @return String length
   */
  writeUTF8String(str: string): number {
    this.buf = buf_write(this.buf, encode(str), this.offset);
    this.offset += str.length;
    return str.length;
  }

  /**
   *  Write UTF8 string with Null-Terminated byte in buffer.
   * @param str String
   * @param nt Null-Terminated byte. Default 0
   * @return String length + 1
   */
  writeUTF8StringNT(str: string, nt: number = 0): number {
    this.buf = buf_write(this.buf, buf_append(encode(str), [nt]), this.offset);
    this.offset += str.length + 1;
    return str.length + 1;
  }
  /**
   * Save buffer in file.
   */
  save(): void {
    Deno.writeFileSync(this.filename, this.buf);
  }
}
