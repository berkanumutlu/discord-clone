import { TextEncoder as NodeTextEncoder, TextDecoder as NodeTextDecoder } from "util";
import "@testing-library/jest-dom";

global.TextEncoder = NodeTextEncoder as unknown as typeof TextEncoder;
global.TextDecoder = NodeTextDecoder as unknown as typeof TextDecoder;

jest.mock('next/font/google', () => ({
    Open_Sans: jest.fn(() => ({ className: 'mocked-class-name' })),
}));
jest.mock('query-string', () => ({
    parse: jest.fn(),
    stringify: jest.fn(),
    stringifyUrl: jest.fn(({ url, query }) => {
        const queryString = Object.entries(query).map(([key, value]) => `${key}=${value}`).join("&");
        return `${url}?${queryString}`;
    })
}));
jest.mock("date-fns", () => ({
    ...jest.requireActual("date-fns"),
    format: jest.fn((date) => {
        const options: Intl.DateTimeFormatOptions = {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        };
        return new Intl.DateTimeFormat("en-GB", options).format(date);
    }),
}));