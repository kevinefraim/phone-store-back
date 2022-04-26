"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const entities_1 = require("../entities");
const messagesRepo = db_1.AppDataSource.getRepository(entities_1.Messages);
