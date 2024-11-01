import '@testing-library/jest-dom';
import { TextEncoder as NodeTextEncoder, TextDecoder as NodeTextDecoder } from 'util';

global.TextEncoder = NodeTextEncoder as unknown as typeof TextEncoder;
global.TextDecoder = NodeTextDecoder as unknown as typeof TextDecoder;

jest.mock('next/font/google', () => ({
    Open_Sans: jest.fn(() => ({ className: 'mocked-class-name' })),
}));

jest.mock('query-string', () => ({
    stringify: jest.fn(),
    parse: jest.fn(),
}));
