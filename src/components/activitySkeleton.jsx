import { SimpleGrid, Skeleton } from "@chakra-ui/react"

const ActivitySkeleton = () => {

    return (
        <SimpleGrid gap={5} spacing={4} my={5} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
            {
                [...Array(20).keys()].map((value) => (
                    <Skeleton key={value} height={190}/>
                ))
            }
        </SimpleGrid>
    )
}

export default ActivitySkeleton