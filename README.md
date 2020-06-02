# binary

> Binary library for Deno.

## Example

```ts
import { Writer, Reader } from "https://deno.land/x/binary/mod.ts";

const writer = new Writer("out.bin");
writer.writeUTF8StringNT("Hello World!");
writer.save();

const reader = new Reader("out.bin");
console.log(reader.readUTF8StringNT()) // Hello World!
```

## Permissions

- allow-read
- allow-write

## API

### Base

#### protected offset: number = 0;

Base offset.

#### protected buf: Uint8Array = new Uint8Array();

Base buffer.

#### setPosition(offset: number): void

Set a new position in the buffer.

| Params | Type   | Description         |
| ------ | ------ | ------------------- |
| offset | number | New position offset |

#### getPosition(): number

Get a current position in the buffer.

| Return | Description      |
| ------ | ---------------- |
| number | Current position |

#### getSource(): Uint8Array

Get source buffer.

| Return     | Description   |
| ---------- | ------------- |
| Uint8Array | Source buffer |

### Reader

#### constructor

Initialize instance.

| Params   | Type   | Description      |
| -------- | ------ | ---------------- |
| filename | string | Name of the file |

#### reader.read(length: number): Uint8Array

Reads a given number of bytes from buffer.

| Params | Type   | Description |
| ------ | ------ | ----------- |
| length | number | Bytes count |

| Return     | Description |
| ---------- | ----------- |
| Uint8Array | Bytes array |

#### reader.readUByte(): number

Reads unsigned byte from buffer.

| Return | Description   |
| ------ | ------------- |
| number | Unsigned byte |

#### reader.readUInt16(): number

Reads unsigned int16 from buffer.

| Return | Description    |
| ------ | -------------- |
| number | Unsigned int16 |

#### reader.readUInt32(): number

Reads unsigned int32 from buffer.

| Return | Description    |
| ------ | -------------- |
| number | Unsigned int32 |

#### reader.readUInt64(): bigint

Reads unsigned bigint from buffer.

| Return | Description     |
| ------ | --------------- |
| bigint | Unsigned bigint |

#### reader.readUTF8String(length: number): string

Reads UTF8 string from buffer.

| Params | Type   | Description   |
| ------ | ------ | ------------- |
| length | number | Symbols count |

| Return | Description |
| ------ | ----------- |
| string | UTF8 string |

#### reader.readUTF8StringNT(nt?: number = 0): string

Reads UTF8 Null-Terminated string from buffer.

| Params | Type   | Description          |
| ------ | ------ | -------------------- |
| nt     | number | Null-Terminated byte |

| Return | Description |
| ------ | ----------- |
| string | UTF8 string |

### Writer

#### constructor

Initialize instance.

| Params   | Type   | Description      |
| -------- | ------ | ---------------- |
| filename | string | Name of the file |

#### writer.write(bytes: number[] | Uint8Array): number

Write bytes in buffer.

| Params | Type                  | Description |
| ------ | --------------------- | ----------- |
| bytes  | number[] / Uint8Array | Bytes array |

| Return | Description                 |
| ------ | --------------------------- |
| number | The number of bytes written |

#### writer.writeUByte(byte: number): void

Write unsigned byte in buffer.

| Params | Type   | Description |
| ------ | ------ | ----------- |
| byte   | number | Byte        |

#### writer.writeUInt16(num: number): void

Write unsigned int16 in buffer.

| Params | Type   | Description  |
| ------ | ------ | ------------ |
| num    | number | Int16 number |

#### writer.writeUInt32(num: number): void

Write unsigned int32 in buffer.

| Params | Type   | Description  |
| ------ | ------ | ------------ |
| num    | number | Int32 number |

#### writer.writeUInt64(long: bigint): void

Write unsigned bigint in buffer.

| Params | Type   | Description   |
| ------ | ------ | ------------- |
| long   | bigint | bigint number |

#### writer.writeUTF8String(str: string): number

Write UTF8 string in buffer.

| Params | Type   | Description |
| ------ | ------ | ----------- |
| str    | string | String      |

| Return | Description                 |
| ------ | --------------------------- |
| number | The number of bytes written |

#### writer.writeUTF8StringNT(str: string, nt?: number = 0): number

Write UTF8 string with Null-Terminated byte in buffer.

| Params | Type   | Description                     |
| ------ | ------ | ------------------------------- |
| str    | string | String                          |
| nt     | number | Null-Terminated byte. Default 0 |

| Return | Description                 |
| ------ | --------------------------- |
| number | The number of bytes written |

#### writer.save(): void

Saves the current buffer to the file specified during initialization.
