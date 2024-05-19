import express from 'express';
import { buildApp } from './app';

const server = express();

buildApp(server);

export default server;
