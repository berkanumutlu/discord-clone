"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Input } from "@/components/ui/input"

interface CustomPaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function CustomPagination({ currentPage, totalPages, onPageChange }: CustomPaginationProps) {
    const renderPageNumbers = useCallback(() => {
        const pageNumbers = []

        // Always show page 1
        pageNumbers.push(1)

        // Calculate the range of pages to show around the current page
        const startPage = Math.max(2, currentPage - 2)
        const endPage = Math.min(totalPages - 1, currentPage + 2)

        // Add ellipsis after page 1 if needed
        if (startPage > 2) {
            pageNumbers.push("ellipsis1")
        }

        // Add pages in the range
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i)
        }

        // Add ellipsis before the last page if needed
        if (endPage < totalPages - 1) {
            pageNumbers.push("ellipsis2")
        }

        // Always show the last page if it's not page 1
        if (totalPages > 1) {
            pageNumbers.push(totalPages)
        }

        return pageNumbers
    }, [currentPage, totalPages])

    const [showPageInput, setShowPageInput] = useState<{ show: boolean; position: string | null }>({
        show: false,
        position: null,
    })
    const [pageInputValue, setPageInputValue] = useState<string>("")
    const pageInputRef = useRef<HTMLInputElement>(null)

    // Focus page input when it becomes visible
    useEffect(() => {
        if (showPageInput.show && pageInputRef.current) {
            pageInputRef.current.focus()
        }
    }, [showPageInput.show])

    // Handle click outside to close page input
    useEffect(() => {
        const handleClickOutsideOfPageInput = (event: MouseEvent) => {
            if (pageInputRef.current && !pageInputRef.current.contains(event.target as Node)) {
                setShowPageInput({ show: false, position: null })
            }
        }

        document.addEventListener("mousedown", handleClickOutsideOfPageInput)
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideOfPageInput)
        }
    }, [])

    const handlePageEllipsisClick = (position: string) => {
        setShowPageInput({ show: true, position })
        setPageInputValue("")
    }

    const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only allow numbers
        const value = e.target.value.replace(/[^0-9]/g, "")
        setPageInputValue(value)
    }

    const handlePageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const pageNumber = parseInt(pageInputValue, 10)

            if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
                onPageChange(pageNumber)
                setShowPageInput({ show: false, position: null })
            } else {
                // Shake the input to indicate invalid input
                if (pageInputRef.current) {
                    pageInputRef.current.classList.add(...["animate-shake", "border-red-500"])
                    setTimeout(() => {
                        if (pageInputRef.current) {
                            pageInputRef.current.classList.remove(...["animate-shake", "border-red-500"])
                        }
                    }, 500)
                }
            }
        } else if (e.key === "Escape") {
            setShowPageInput({ show: false, position: null })
        }
    }

    return (
        <Pagination className="py-1 w-min items-center">
            <PaginationContent className="gap-0">
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            if (currentPage > 1) onPageChange(currentPage - 1)
                        }}
                        className={cn(
                            "m-1 p-[0_12px_0_8px] w-min min-w-7 h-7 min-h-[38px] relative flex justify-center items-center bg-transparent hover:bg-app-bg-secondary-alt font-semibold text-[14px] leading-4 rounded-[3px] select-none",
                            currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                        )}
                    />
                </PaginationItem>

                {renderPageNumbers().map((page, index) => {
                    if (page === "ellipsis1" || page === "ellipsis2") {
                        const position = page as string

                        return (
                            <PaginationItem key={`ellipsis-${index}`} className={cn(
                                "hidden lg:flex text-[#757575] dark:text-[#8a8a8a] text-center",
                                showPageInput.show && showPageInput.position === position ? "w-full" : "my-2 mx-1 w-7",
                                page === "ellipsis2" ? "!flex" : ""
                            )}>
                                {showPageInput.show && showPageInput.position === position ? (
                                    <Input
                                        ref={pageInputRef}
                                        type="text"
                                        value={pageInputValue}
                                        onChange={handlePageInputChange}
                                        onKeyDown={handlePageInputKeyDown}
                                        className="p-1 w-[60px] h-[34px] bg-app-bg-secondary-alt text-primary focus-visible:ring-0 focus-visible:ring-offset-0"
                                    />
                                ) : (
                                    <PaginationEllipsis
                                        className="my-2 mx-1 p-1.5 w-7 min-w-7 h-7 flex justify-center items-end hover:bg-app-bg-secondary-alt text-[#757575] font-display font-semibold text-[16px] leading-[120%] text-center rounded-[14px] cursor-pointer
                                        [&_svg]:size-3"
                                        onClick={() => handlePageEllipsisClick(position)}
                                    />
                                )}
                            </PaginationItem>
                        )
                    }

                    return (
                        <PaginationItem key={`page-${page}`}>
                            <PaginationLink
                                href="#"
                                isActive={page === currentPage}
                                onClick={(e) => {
                                    e.preventDefault()
                                    onPageChange(page as number)
                                }}
                                className={cn(
                                    "m-1 p-1.5 w-min min-w-7 h-7 justify-center items-center font-primary font-semibold text-[16px] rounded-[14px]",
                                    (page === currentPage || page === totalPages) ? "flex" : "hidden lg:flex",
                                    page === currentPage ? "bg-app-bg-brand-experiment hover:bg-app-bg-brand-experiment text-app-white hover:text-app-white border-none" : "hover:bg-app-bg-secondary-alt"
                                )}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    )
                })}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            if (currentPage < totalPages) onPageChange(currentPage + 1)
                        }}
                        className={cn(
                            "m-1 p-[0_8px_0_12px] w-min min-w-7 h-7 min-h-[38px] relative flex justify-center items-center bg-transparent hover:bg-app-bg-secondary-alt font-semibold text-[14px] leading-4 rounded-[3px] select-none",
                            currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
                        )}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
