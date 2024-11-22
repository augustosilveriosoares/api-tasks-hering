CREATE TABLE IF NOT EXISTS task (
    id CHAR(36) PRIMARY KEY,  
    title VARCHAR(255) NOT NULL,  
    date DATE NOT NULL,  
    description VARCHAR(255),  
    completed BOOLEAN NOT NULL DEFAULT false  
);


