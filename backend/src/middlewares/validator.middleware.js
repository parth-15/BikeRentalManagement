function useValidator(validator) {
  return async (req, res, next) => {
    try {
      await validator.validateAsync(req.body);
      next();
    } catch (err) {
      console.error('Error in useValidator', err);
      res.status(400).json({
        success: false,
        error: err.details[0].message,
      });
    }
  };
}

export default useValidator;
