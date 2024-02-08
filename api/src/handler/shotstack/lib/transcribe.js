'use strict';

const Joi = require('joi');

const validateBody = (body) => {
    const schema = Joi.object({
        video: Joi.string().uri().min(2).max(300).required(),
    });

    return schema.validate({ ...body });
};

const prepareRequestJson = (body) => {
    const valid = validateBody(body);

    if (valid.error) {
        throw new Error(valid.error.details[0].message);
    }

    const { video: videoUrl } = body;

    return {
        "url": videoUrl,
        "outputs": {
            "renditions": [{
                "format": "mp4",
                "size": {
                    "height": 576
                }
            }],
            "transcription": {
                "format": "vtt"
            }
        },
        "destinations": [
            {
                "provider": "shotstack"
            }
        ]
    };
};

module.exports = {
    prepareRequestJson,
};
