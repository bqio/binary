export function buf_append(buffer: Uint8Array, bytes: number[]): Uint8Array {
  let buf = new Uint8Array(buffer.byteLength + bytes.length);
  buf.set(buffer, 0);
  buf.set(bytes, buffer.length);
  return buf;
}

export function buf_write(
  buffer: Uint8Array,
  bytes: number[] | Uint8Array,
  offset: number = 0,
  log: boolean = false,
): Uint8Array {
  let buf, buf0, buf1;
  if (offset + bytes.length > buffer.byteLength) {
    buf = new Uint8Array(
      buffer.byteLength + bytes.length,
    );
  } else {
    buf = buffer;
  }
  if (offset >= buffer.byteLength) {
    buf0 = buffer;
    buf1 = new Uint8Array();
  } else {
    buf0 = buffer.slice(0, offset);
    buf1 = buffer.slice(offset + bytes.length, buffer.byteLength);
  }
  if (log) {
    console.log("Buffer source: ", buffer);
    console.log("Bytes: ", bytes);
    console.log("Offset: ", offset);
    console.log("Buffer init: ", buf);
    console.log("Buffer 0: ", buf0);
    console.log("Buffer 1: ", buf1);
  }
  buf.set(buf0, 0);
  buf.set(bytes, offset);
  buf.set(buf1, offset + bytes.length);
  if (log) {
    console.log("Buffer dist: ", buf);
    console.log("============================");
  }
  return buf;
}

// https://coolaj86.com/articles/convert-js-bigints-to-typedarrays/
export function long_to_buf(long: bigint): Uint8Array {
  let hex = long.toString(16);
  if (hex.length % 2) hex = "0" + hex;
  let len = hex.length / 2;
  let u8 = new Uint8Array(len);
  let i = 0;
  let j = 0;
  while (i < len) {
    u8[i] = parseInt(hex.slice(j, j + 2), 16);
    i += 1;
    j += 2;
  }
  return u8.reverse();
}
