const { z } = require("zod");

const formValidationSchema = z.object({
  name: z.string().min(1, "Name is Required").max(25, "Max Char Limit Reached"),
  email: z.string().email(),
  message: z
    .string()
    .min(10, "Message is Required")
    .max(200, "Max Char Limit Reached"),
});

module.exports = { formValidationSchema };
