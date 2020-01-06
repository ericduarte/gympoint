const handleSqlzErrors = error => {
  const errorOut = [];
  switch (error.name) {
    case 'SequelizeForeignKeyConstraintError':
      errorOut.push({ message: error.original.detail });
      break;
    case 'SequelizeValidationError':
      error.errors.forEach(item => errorOut.push({ message: item.message }));
      break;
    case 'SequelizeUniqueConstraintError':
      errorOut.push({
        message: error.errors[0].message,
      });
      break;
    case 'SequelizeDatabaseError':
      errorOut.push({ message: 'Internal error ' });
      break;
    default:
      return errorOut;
  }

  return errorOut;
};

export default handleSqlzErrors;
