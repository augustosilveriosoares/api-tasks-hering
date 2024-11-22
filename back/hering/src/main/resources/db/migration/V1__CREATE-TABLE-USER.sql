CREATE TABLE IF NOT EXISTS user (
    id CHAR(36) PRIMARY KEY,  
    username VARCHAR(255) NOT NULL UNIQUE,  
    password VARCHAR(255) NOT NULL,  
    role VARCHAR(50) NOT NULL,  
    status BOOLEAN NOT NULL DEFAULT true  
);



