# binary

> Binary library for Deno.

## Example

```ts
import { Writer, Reader, Serializer } from "https://deno.land/x/binary/mod.ts";

// Writer example
const writer: Writer = new Writer("out.bin");
writer.writeUTF8StringNT("Hello World!");
writer.save();

// Reader example
const reader: Reader = new Reader("out.bin");
console.log(reader.readUTF8StringNT()) // Hello World!

// Serializer example
class Animal {
  constructor(private name: string) {}
  getName(): string {
    return this.name;
  }
}

const bytes: Uint8Array = Serializer.serialize(new Animal("Rabbit"));
const instance: Animal = Serializer.deserialize(bytes, Animal);
```

## Permissions

- allow-read
- allow-write

## API

### Stream (Abstract)

#### protected offset: number = 0;

Offset in stream.

#### protected buffer: Uint8Array = new Uint8Array();

Byte array.

#### setPosition(offset: number)

Set new position.

| Params | Type   | Description         |
| ------ | ------ | ------------------- |
| offset | number | New position offset |

#### getPosition(): number

Get current position.

| Return | Description      |
| ------ | ---------------- |
| number | Current position |

#### getSource(): Uint8Array

Get source byte array.

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

### Serializer

#### serialize(obj: object): Uint8Array

Serializes object.

| Params | Type   | Description                     |
| ------ | ------ | ------------------------------- |
| obj    | object | Any object                      |

| Return | Description                 |
| ------ | --------------------------- |
| Uint8Array | Serialized UTF8 bytes array |

#### deserialize(bytes: Uint8Array, type: any): any

Deserializes object.

| Params | Type   | Description                     |
| ------ | ------ | ------------------------------- |
| bytes    | Uint8Array | Serialized UTF8 bytes array      
| type    | any | Object instance type                  |

| Return | Description                 |
| ------ | --------------------------- |
| any | Any object |
