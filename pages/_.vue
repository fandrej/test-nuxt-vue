<template>
    <div>
        <h2>_.vue</h2>
    </div>
</template>

<script>
export default {
    validate ({ params }) {
        // Must be a number
        return /^\d+$/.test(params.id);
    }
}
</script>
