const validate = (schema) => (req, res, next) => {
    try {
        // 🟢 Convert potential JSON strings (like ["S","M"]) into real arrays
        for (let key in req.body) {
            if (typeof req.body[key] === "string") {
                try {
                    const parsed = JSON.parse(req.body[key]);
                    req.body[key] = parsed;
                } catch {
                    // ignore if it's not JSON
                }
            }
        }

        // Joi validation (auto convert numbers etc.)
        const { error, value } = schema.validate(req.body, { convert: true });

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        req.body = value;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = validate;
