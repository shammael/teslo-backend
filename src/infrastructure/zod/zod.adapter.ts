/* eslint-disable max-classes-per-file */

// interface IStringSchema {
//   string(message: string): IStringSchema;
// }

// interface IRequestSchemaValidator {
//   object(data: object): IRequestSchemaValidator;
// }

// interface GeneralObject {
//   [key: string]: SchemaValidator;
// }

// class SchemaValidator {
//   validator: any[] = [];

//   object(data: GeneralObject): SchemaValidator {
//     return this;
//   }

//   string(message: string): SchemaValidator {
//     return this;
//   }

//   email(message: string): SchemaValidator {
//     return this;
//   }

//   parse() {}
// }

// const zod = new SchemaValidator();

// zod.object({
//   name: zod.string('the name are required'),
//   email: zod.string('the email are required'),
// });

interface Validate {
  validate(): any;
}
// TODO: Implementar Schema validator with composite
// Video link https://www.youtube.com/watch?v=Sw7-qYWMyJ0&t=643s
// class SchemaValidator implements Validate {
//   private children: Validate[] = [];

//   add(schema: Validate): void {
//     this.children.push(schema);
//   }

//   validate() {
//     this.children.map((child) => {
//       child.validate();
//       return null;
//     });
//   }
// }

// class ObjectValidator implements Validate {
//   constructor(private readonly object: { [key: string]: any }) {}
//   validate() {
//     for (const obj in object) {

//     }
//   }
// }

// const schema = new SchemaValidator();

// const object = new ObjectValidator({name: })

// const schema = object;
