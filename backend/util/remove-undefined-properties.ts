export const removeUndefinedProperties = (object: {[key: string]: any | undefined}): {[key: string]: any} =>
    Object.fromEntries(
        Object.entries(object)
            .filter(([_, value]) => value !== undefined)
    );
