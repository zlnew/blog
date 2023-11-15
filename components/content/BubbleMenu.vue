<script setup lang="ts">
import { BubbleMenu, Editor } from '@tiptap/vue-3'

defineProps<{
  editor: Editor | undefined
}>()

defineEmits(['setLink'])
</script>

<template>
  <bubble-menu
    v-if="editor"
    :editor="editor"
    :tippy-options="{
      duration: 100,
      hideOnClick: true
    }"
  >
    <div
      class="
          p-2 rounded-sm
          flex flex-wrap gap-2
          bg-white dark:bg-accent-light
          border dark:border-accent-light
          shadow-lg
        "
    >
      <UTooltip text="Bold">
        <UButton
          icon="i-material-symbols-format-bold"
          color="black"
          :variant="editor.isActive('bold') ? 'solid' : 'outline'"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          class="rounded-sm"
          @click="editor.chain().focus().toggleBold().run()"
        />
      </UTooltip>

      <UTooltip text="Italic">
        <UButton
          icon="i-material-symbols-format-italic"
          color="black"
          :variant="editor.isActive('italic') ? 'solid' : 'outline'"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          class="rounded-sm"
          @click="editor.chain().focus().toggleItalic().run()"
        />
      </UTooltip>

      <UTooltip text="Strike">
        <UButton
          icon="i-material-symbols-format-strikethrough"
          color="black"
          :variant="editor.isActive('strike') ? 'solid' : 'outline'"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          class="rounded-sm"
          @click="editor.chain().focus().toggleStrike().run()"
        />
      </UTooltip>

      <UTooltip text="Code">
        <UButton
          icon="i-material-symbols-code"
          color="black"
          :variant="editor.isActive('code') ? 'solid' : 'outline'"
          :disabled="!editor.can().chain().focus().toggleCode().run()"
          class="rounded-sm"
          @click="editor.chain().focus().toggleCode().run()"
        />
      </UTooltip>

      <UTooltip text="Paragraph">
        <UButton
          icon="i-material-symbols-format-paragraph"
          color="black"
          :variant="editor.isActive('paragraph') ? 'solid' : 'outline'"
          :disabled="!editor.can().chain().focus().setParagraph().run()"
          class="rounded-sm"
          @click="editor.chain().focus().setParagraph().run()"
        />
      </UTooltip>

      <UTooltip text="Heading 1">
        <UButton
          icon="i-material-symbols-format-h1"
          color="black"
          :variant="editor.isActive('heading', { level: 1 }) ? 'solid' : 'outline'"
          class="rounded-sm"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        />
      </UTooltip>

      <UTooltip text="Heading 2">
        <UButton
          icon="i-material-symbols-format-h2"
          color="black"
          :variant="editor.isActive('heading', { level: 2 }) ? 'solid' : 'outline'"
          class="rounded-sm"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        />
      </UTooltip>

      <UTooltip text="Heading 3">
        <UButton
          icon="i-material-symbols-format-h3"
          color="black"
          :variant="editor.isActive('heading', { level: 3 }) ? 'solid' : 'outline'"
          class="rounded-sm"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        />
      </UTooltip>

      <UTooltip text="Heading 4">
        <UButton
          icon="i-material-symbols-format-h4"
          color="black"
          :variant="editor.isActive('heading', { level: 4 }) ? 'solid' : 'outline'"
          class="rounded-sm"
          @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        />
      </UTooltip>

      <UTooltip text="Heading 5">
        <UButton
          icon="i-material-symbols-format-h5"
          color="black"
          :variant="editor.isActive('heading', { level: 5 }) ? 'solid' : 'outline'"
          class="rounded-sm"
          @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        />
      </UTooltip>

      <UTooltip text="Heading 6">
        <UButton
          icon="i-material-symbols-format-h6"
          color="black"
          :variant="editor.isActive('heading', { level: 6 }) ? 'solid' : 'outline'"
          class="rounded-sm"
          @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        />
      </UTooltip>

      <UTooltip text="Bulleted list">
        <UButton
          icon="i-material-symbols-format-list-bulleted"
          color="black"
          :variant="editor.isActive('bulletList') ? 'solid' : 'outline'"
          class="rounded-sm"
          @click="editor.chain().focus().toggleBulletList().run()"
        />
      </UTooltip>

      <UTooltip text="Numbered list">
        <UButton
          icon="i-material-symbols-format-list-numbered"
          color="black"
          :variant="editor.isActive('orderedList') ? 'solid' : 'outline'"
          class="rounded-sm"
          @click="editor.chain().focus().toggleOrderedList().run()"
        />
      </UTooltip>

      <UTooltip text="Code blocks">
        <UButton
          icon="i-material-symbols-code-blocks"
          color="black"
          :variant="editor.isActive('codeBlock') ? 'solid' : 'outline'"
          class="rounded-sm"
          @click="editor.chain().focus().toggleCodeBlock().run()"
        />
      </UTooltip>

      <UTooltip text="Quote">
        <UButton
          icon="i-material-symbols-format-quote"
          color="black"
          :variant="editor.isActive('blockquote') ? 'solid' : 'outline'"
          class="rounded-sm"
          @click="editor.chain().focus().toggleBlockquote().run()"
        />
      </UTooltip>

      <UTooltip text="Set link">
        <UButton
          icon="i-material-symbols-add-link"
          color="black"
          variant="outline"
          class="rounded-sm"
          @click="$emit('setLink')"
        />
      </UTooltip>

      <UTooltip text="Unset link">
        <UButton
          icon="i-material-symbols-link-off"
          color="black"
          variant="outline"
          class="rounded-sm"
          :disabled="!editor.isActive('link')"
          @click="editor.chain().focus().unsetLink().run()"
        />
      </UTooltip>
    </div>
  </bubble-menu>
</template>
