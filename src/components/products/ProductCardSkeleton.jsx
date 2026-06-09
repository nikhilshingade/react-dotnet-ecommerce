import { Card, CardContent, Skeleton, Stack, Box } from "@mui/material";

function ProductCardSkeleton() {
  return (
    <Card
      sx={{
        width: { xs: "250px", sm: "300px", md: "250px", lg: "250px" },
        height: 420,
        display: "flex",
        flexDirection: "column",
        borderRadius: "14px",
        border: "1px solid",
        borderColor: "grey.200",
        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        overflow: "hidden",
      }}
    >
      <Skeleton
        variant="rectangular"
        sx={{ height: 190, flexShrink: 0 }}
        animation="wave"
      />

      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: "12px 14px 14px",
          "&:last-child": { pb: "14px" },
        }}
      >
        {/* Category chip */}
        <Skeleton
          variant="rounded"
          width={80}
          height={22}
          sx={{ mb: 1, borderRadius: "6px" }}
          animation="wave"
        />

        {/* Product name — 2 lines */}
        <Skeleton variant="text" width="90%" height={20} animation="wave" />
        <Skeleton
          variant="text"
          width="65%"
          height={20}
          sx={{ mb: 0.6 }}
          animation="wave"
        />

        {/* Description — 2 lines */}
        <Skeleton variant="text" width="100%" height={16} animation="wave" />
        <Skeleton
          variant="text"
          width="80%"
          height={16}
          sx={{ mb: "auto" }}
          animation="wave"
        />

        {/* Price + Stock row */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 1.5, mb: 1.2 }}
        >
          <Skeleton variant="text" width={80} height={28} animation="wave" />
          <Skeleton
            variant="rounded"
            width={90}
            height={22}
            sx={{ borderRadius: "6px" }}
            animation="wave"
          />
        </Stack>

        <Skeleton
          variant="rounded"
          height={38}
          sx={{ borderRadius: "9px" }}
          animation="wave"
        />
      </CardContent>
    </Card>
  );
}

export default ProductCardSkeleton;
