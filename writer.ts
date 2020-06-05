import Stream from "./_stream.ts";
import { buf_append, buf_write, long_to_buf } from "./_utils.ts";
import { encode } from "https://deno.land/std/encoding/utf8.ts";
import { existsSync } from "https://deno.land/std/fs/exists.ts";

export class Writer extends Stream {
  /**
   * Initialize binary writer.
   * @param filename Filename
   */
  constructor(readonly filename: string) {
    super();
    if (existsSync(filename)) {
      this.buffer = Deno.readFileSync(filename);
    }
  }

  /**
   *  Write bytes in stream.
   * @param bytes Bytes array
   * @return Bytes count
   */
  write(bytes: number[] | Uint8Array): number {
    this.buffer = buf_write(this.buffer, bytes, this.offset);
    this.offset += bytes.length;
    return bytes.length;
  }

  /**
   *  Write unsigned byte in stream.
   * @param byte Unsigned byte
   */
  writeUByte(byte: number): void {
    this.buffer = buf_write(this.buffer, [byte], this.offset);
    this.offset++;
  }

  /**
   *  Write unsigned int16 in stream.
   * @param num Unsigned int16
   */
  writeUInt16(num: number): void {
    this.buffer = buf_write(this.buffer, [num, num >> 8], this.offset);
    this.offset += 2;
  }

  /**
   *  Write unsigned int32 in stream.
   * @param num Unsigned int32
   */
  writeUInt32(num: number): void {
    this.buffer = buf_write(
      this.buffer,
      [num, num >> 8, num >> 16, num >> 24],
      this.offset,
    );
    this.offset += 4;
  }

  /**
   *  Write unsigned int64 in stream.
   * @param num Unsigned int64
   */
  writeUInt64(num: bigint): void {
    this.buffer = buf_write(
      this.buffer,
      long_to_buf(num),
      this.offset,
    );
    this.offset += 8;
  }

  /**
   *  Write UTF8 string in stream.
   * @param str String
   * @return String length
   */
  writeUTF8String(str: string): number {
    this.buffer = buf_write(this.buffer, encode(str), this.offset);
    this.offset += str.length;
    return str.length;
  }

  /**
   *  Write UTF8 string with Null-Terminated byte in stream.
   * @param str String.
   * @param nt Null-Terminated byte. Default 0.
   * @return String length + 1.
   */
  writeUTF8StringNT(str: string, nt: number = 0): number {
    this.buffer = buf_write(
      this.buffer,
      buf_append(encode(str), [nt]),
      this.offset,
    );
    this.offset += str.length + 1;
    return str.length + 1;
  }

  /**
   * Saves the current stream to the file specified during initialization.
   */
  save(): void {
    Deno.writeFileSync(this.filename, this.buffer);
  }
}
