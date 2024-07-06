const docs = {
    "openapi": "3.0.0",
    "info": {
      "title": "School Management API",
      "version": "1.0.0",
      "description": "API documentation for managing students in the school system."
    },
    "paths": {
      "/student/create": {
        "post": {
          "summary": "Create a new student",
          "operationId": "createStudent",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string"
                    },
                    "classRoomId": {
                      "type": "integer"
                    },
                    "schoolId": {
                      "type": "integer"
                    }
                  },
                  "required": [
                    "name",
                    "classRoomId",
                    "schoolId"
                  ]
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Student created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      },
                      "status": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request"
            }
          }
        }
      },
      "/student/get/{id}": {
        "get": {
          "summary": "Get a student by ID",
          "operationId": "getStudent",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "integer"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      },
                      "status": {
                        "type": "boolean"
                      },
                      "student": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "integer"
                          },
                          "name": {
                            "type": "string"
                          },
                          "classRoom": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "integer"
                              },
                              "classNumber": {
                                "type": "string"
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request"
            }
          }
        }
      },
      "/student/getAll": {
        "get": {
          "summary": "Get all students",
          "operationId": "getAllStudents",
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      },
                      "status": {
                        "type": "boolean"
                      },
                      "students": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer"
                            },
                            "name": {
                              "type": "string"
                            },
                            "classRoom": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer"
                                },
                                "classNumber": {
                                  "type": "string"
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request"
            }
          }
        }
      },
      "/student/update/{id": {
        "put": {
          "summary": "Update a student by ID",
          "operationId": "updateStudent",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "integer"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string"
                    },
                    "classRoomId": {
                      "type": "integer"
                    }
                  },
                  "required": [
                    "name",
                    "classRoomId"
                  ]
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Student updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      },
                      "status": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request"
            }
          }
        }
      },
      "/student/delete/{id}": {
        "delete": {
          "summary": "Delete a student by ID",
          "operationId": "deleteStudent",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "integer"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "Student deleted successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      },
                      "status": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request"
            }
          }
        }
      },
      "/admin/create": {
      "post": {
        "summary": "Create a new admin",
        "operationId": "createAdmin",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": {
                    "type": "string"
                  },
                  "password": {
                    "type": "string"
                  },
                  "schoolId": {
                    "type": "integer"
                  }
                },
                "required": [
                  "email",
                  "password",
                  "schoolId"
                ]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Admin created successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "status": {
                      "type": "boolean"
                    },
                    "token": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "200": {
            "description": "Admin already exists",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "status": {
                      "type": "boolean"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request"
          }
        }
      }
    },
    "/admin/get/{id}": {
      "get": {
        "summary": "Get an admin by ID",
        "operationId": "getAdminById",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "status": {
                      "type": "boolean"
                    },
                    "admin": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "integer"
                        },
                        "email": {
                          "type": "string"
                        },
                        "schoolId": {
                          "type": "integer"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request"
          }
        }
      }
    },
    "/admin/getAll": {
      "get": {
        "summary": "Get all admins",
        "operationId": "getAllAdmins",
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "status": {
                      "type": "boolean"
                    },
                    "admins": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "integer"
                          },
                          "email": {
                            "type": "string"
                          },
                          "schoolId": {
                            "type": "integer"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request"
          }
        }
      }
    },
    "/admin/update/{id}": {
      "put": {
        "summary": "Update an admin by ID",
        "operationId": "updateAdmin",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "password": {
                    "type": "string"
                  }
                },
                "required": [
                  "password"
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Admin updated successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "status": {
                      "type": "boolean"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request"
          }
        }
      }
    },
    "/admin/delete/{id}": {
      "delete": {
        "summary": "Delete an admin by ID",
        "operationId": "deleteAdmin",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Admin deleted successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "status": {
                      "type": "boolean"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request"
          }
        }
      }
    },
    "/school/create": {
      "post": {
        "summary": "Create a new school",
        "operationId": "createSchool",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "manager": {
                    "type": "string"
                  }
                },
                "required": [
                  "name",
                  "manager"
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "School created successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "status": {
                      "type": "boolean"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request"
          }
        }
      }
    },
    "/school/get/{id}": {
      "get": {
        "summary": "Get a school by ID",
        "operationId": "getSchoolById",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "status": {
                      "type": "boolean"
                    },
                    "school": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "integer"
                        },
                        "name": {
                          "type": "string"
                        },
                        "manager": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request"
          }
        }
      }
    },
    "/school/getAll": {
      "get": {
        "summary": "Get all schools",
        "operationId": "getAllSchools",
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "status": {
                      "type": "boolean"
                    },
                    "schools": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "integer"
                          },
                          "name": {
                            "type": "string"
                          },
                          "manager": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request"
          }
        }
      }
    },
    "/school/update/{id}": {
      "put": {
        "summary": "Update a school by ID",
        "operationId": "updateSchool",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "manager": {
                    "type": "string"
                  }
                },
                "required": [
                  "name",
                  "manager"
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "School updated successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "status": {
                      "type": "boolean"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request"
          }
        }
      }
    },
    "/school/delete/{id}": {
      "delete": {
        "summary": "Delete a school by ID",
        "operationId": "deleteSchool",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "School deleted successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "status": {
                      "type": "boolean"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request"
          }
        }
      }
    },

    "/classRoom/create": {
      "post": {
        "summary": "Create a new classroom",
        "operationId": "createClassRoom",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "classNumber": {
                    "type": "string"
                  },
                  "schoolId": {
                    "type": "integer"
                  }
                },
                "required": [
                  "classNumber",
                  "schoolId"
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Classroom created successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "status": {
                      "type": "boolean"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request"
          }
        }
      }
    },
    "/classRoom/get/{id}": {
      "get": {
        "summary": "Get a classroom by ID",
        "operationId": "getClassRoomById",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "status": {
                      "type": "boolean"
                    },
                    "classRoom": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "integer"
                        },
                        "classNumber": {
                          "type": "string"
                        },
                        "schoolId": {
                          "type": "integer"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request"
          }
        }
      }
    },
    "/classRoom/getAll": {
      "get": {
        "summary": "Get all classrooms",
        "operationId": "getAllClassRooms",
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "status": {
                      "type": "boolean"
                    },
                    "classRooms": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "integer"
                          },
                          "classNumber": {
                            "type": "string"
                          },
                          "schoolId": {
                            "type": "integer"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request"
          }
        }
      }
    },
    "/v/update/{id}": {
      "put": {
        "summary": "Update a classroom by ID",
        "operationId": "updateClassRoom",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "classNumber": {
                    "type": "string"
                  }
                },
                "required": [
                  "classNumber"
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Classroom updated successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "status": {
                      "type": "boolean"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request"
          }
        }
      }
    },
    "/classRoom/delete/{id}": {
      "delete": {
        "summary": "Delete a classroom by ID",
        "operationId": "deleteClassRoom",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Classroom deleted successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "status": {
                      "type": "boolean"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request"
          }
        }
      }
    },

    "/superAdmin/create": {
      "post": {
        "summary": "Create a new super admin",
        "operationId": "createSuperAdmin",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": {
                    "type": "string"
                  },
                  "password": {
                    "type": "string"
                  }
                },
                "required": [
                  "email",
                  "password"
                ]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Super admin created successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "status": {
                      "type": "boolean"
                    },
                    "token": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "200": {
            "description": "Super admin already exists",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "status": {
                      "type": "boolean"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request"
          }
        }
      }
    },

    "/admin/login": {
      "post": {
        "summary": "Login an admin",
        "operationId": "loginAdmin",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": {
                    "type": "string"
                  },
                  "password": {
                    "type": "string"
                  }
                },
                "required": [
                  "email",
                  "password"
                ]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Admin logged in successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "status": {
                      "type": "boolean"
                    },
                    "token": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "200": {
            "description": "No such admin exists or incorrect email/password",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "status": {
                      "type": "boolean"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request"
          }
        }
      }
    },

    "/superAdmin/login": {
      "post": {
        "summary": "Login a super admin",
        "operationId": "loginSuperAdmin",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": {
                    "type": "string"
                  },
                  "password": {
                    "type": "string"
                  }
                },
                "required": [
                  "email",
                  "password"
                ]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Super admin logged in successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "status": {
                      "type": "boolean"
                    },
                    "token": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "200": {
            "description": "Login failed",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "status": {
                      "type": "boolean"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request"
          }
        }
      }
    }
  },
  "components": {
    "securitySchemes": {
      "BearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
    },
    "security": [
      {
        "BearerAuth": []
      }
    ]
}
  

export default docs